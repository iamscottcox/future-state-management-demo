import { ChangeEvent, FC } from "react";

export interface Option {
    value: string;
    text?: string;
}

interface OwnProps {
    value: string;
    onChange: (value: string) => void;
}

type Props = OwnProps;

export const Select: FC<Props> = ({ onChange, children }) => {
    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    }

    return (
        <select onChange={handleOnChange}>
            {children}
        </select>
    );
}