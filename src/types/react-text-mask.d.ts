declare module 'react-text-mask' {
    import { Component, InputHTMLAttributes } from 'react';

    interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
        mask: (string | RegExp)[];
        guide?: boolean;
        placeholderChar?: string;
        keepCharPositions?: boolean;
        pipe?: (conformedValue: string, config: any) => string;
        showMask?: boolean;
        inputRef?: (ref: HTMLInputElement) => void;
    }

    export default class MaskedInput extends Component<MaskedInputProps> {
        inputElement: HTMLInputElement;
    }
} 