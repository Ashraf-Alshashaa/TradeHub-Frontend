import {  ChangeEvent } from "react";

export interface TextareaProps {
    label: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean
}