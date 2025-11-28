"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
    className?: string;
    disabled?: boolean;
}

export default function CustomSelect({
    value,
    onChange,
    options,
    placeholder,
    className = "",
    disabled = false,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(option => option.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 sm:py-2.5 text-white outline-none focus:border-neutral-500 text-sm sm:text-base hover:bg-neutral-700 focus:bg-neutral-700 transition-colors duration-200 flex items-center justify-between ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <span className={value ? "text-white" : "text-neutral-400"}>
                    {displayValue}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm sm:text-base transition-colors duration-150 ${option.value === value
                                    ? "bg-neutral-600 text-white"
                                    : "text-white hover:bg-neutral-700"
                                } first:rounded-t-lg last:rounded-b-lg`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
