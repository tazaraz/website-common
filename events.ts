export interface DropdownEvent {
    id: number;
    target: HTMLLIElement
    isOpen: boolean;
}

export interface InputEvent {
    value: string
    target: HTMLInputElement
}

export interface selectEvent {
    id: number;
    target: HTMLLIElement
}

export interface ConditionToolEvent {
    index: number;
    event: Event;
}