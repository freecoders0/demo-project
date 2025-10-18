"use client";

import { useState } from "react";
import {
  ChevronDown,
  Copy,
  MessageCircle,
  MessageCircleMore,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Contact, User } from "@/types/user";

function ContactIcon({ type }: { type: "whatsapp" | "messenger" }) {
  if (type === "whatsapp") {
    return <MessageCircle className="w-5 h-5 text-green-400 flex-shrink-0" />;
  }
  return <MessageCircleMore className="w-5 h-5 text-blue-400 flex-shrink-0" />;
}

function ContactRow({
  contact,
  contactIndex,
  isLast,
  copiedField,
  onCopy,
  onWhatsApp,
  onMessenger,
}: {
  contact: Contact;
  contactIndex: number;
  isLast: boolean;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
  onWhatsApp: (number: string) => void;
  onMessenger: (url: string) => void;
}) {
  const isCopied = copiedField === `contact-${contactIndex}`;

  return (
    <tr className={!isLast ? "border-b border-white/20" : ""}>
      <td className="py-2 sm:py-3 pl-2 sm:pl-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <ContactIcon type={contact.type} />
          <span className="text-xs sm:text-sm text-white/70">
            {contact.type === "whatsapp" ? "WhatsApp" : "Messenger"}
            {contact.label && (
              <span className="text-white/50"> ({contact.label})</span>
            )}
          </span>
        </div>
      </td>
      <td className="py-2 px-2 sm:px-4 font-semibold text-xs sm:text-sm break-all">
        {contact.value}
      </td>
      <td className="py-2 pr-2 sm:pr-4">
        <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onCopy(contact.value, `contact-${contactIndex}`)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs sm:text-sm"
          >
            <Copy className="w-4 h-4" />
            {isCopied ? "Copied!" : "Copy"}
          </Button>

          {contact.type === "whatsapp" ? (
            <Button
              size="sm"
              onClick={() => onWhatsApp(contact.value)}
              className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Message
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => onMessenger(contact.value)}
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm"
            >
              <MessageCircleMore className="w-4 h-4" />
              Open
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}

function UserRowHeader({
  user,
  isExpanded,
  onClick,
  isFirst,
  isLast,
}: {
  user: User;
  isExpanded: boolean;
  onClick: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 sm:px-4 py-3 transition-all duration-300 ${
        isExpanded
          ? "bg-black text-white"
          : "bg-[#FDDD04] text-black hover:bg-[#FDD004] "
      } ${isFirst ? "rounded-t-lg" : ""} ${
        isLast && !isExpanded ? "rounded-b-lg" : ""
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className="flex flex-col items-center min-w-fit">
          <span
            className={`text-[10px] sm:text-xs ${
              isExpanded ? "text-white/70" : "text-black/70"
            }`}
          >
            আইডি
          </span>
          <span className="font-semibold text-xs sm:text-sm">{user.id}</span>
        </div>
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex-shrink-0"
        />
        <div className="text-left truncate">
          <p className="font-semibold text-base sm:text-lg truncate">
            {user.name}
          </p>
          <p
            className={`text-xs sm:text-sm truncate ${
              isExpanded ? "text-white/70" : "text-black/70"
            }`}
          >
            {user.role}
          </p>
        </div>
      </div>
      <ChevronDown
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 flex-shrink-0 ${
          isExpanded ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

export function UserTable({ allUsers }: { allUsers: User[] }) {
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const openWhatsApp = (number: string) => {
    const cleanNumber = number.replace(/\s+/g, "");
    window.open(`https://wa.me/${cleanNumber}`, "_blank");
  };

  const openMessenger = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-5xl mx-auto overflow-hidden rounded-lg">
        {allUsers.map((user, index) => (
          <div key={user.id}>
            <UserRowHeader
              user={user}
              isExpanded={expandedUserId === user.id}
              onClick={() =>
                setExpandedUserId(expandedUserId === user.id ? null : user.id)
              }
              isFirst={index === 0}
              isLast={index === allUsers.length - 1}
            />
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedUserId === user.id ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] bg-black text-white border-t border-white/20 text-xs sm:text-sm">
                  <tbody>
                    {user.contacts.map((contact, contactIndex) => (
                      <ContactRow
                        key={contactIndex}
                        contact={contact}
                        contactIndex={contactIndex}
                        isLast={contactIndex === user.contacts.length - 1}
                        copiedField={copiedField}
                        onCopy={copyToClipboard}
                        onWhatsApp={openWhatsApp}
                        onMessenger={openMessenger}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
