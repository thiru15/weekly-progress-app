export interface Question {
    id: string;
    question: String;
    options: Array<string>;
    containOthers: boolean;
    showOthers: boolean;
}