export const CLIENT_TYPES = ['Client', 'Person', 'Company', 'Service'] as const;

export type Client = {
    id: string;
    companyName?: string;
    name?: string;
    lastName?: string;
    address?: string;
    type: typeof CLIENT_TYPES[number];        
}

export type Currency = {
    id: string;
    name: string;
    value_from?: Currency;
    value: number;
    lastUpdate: Date;
}

export type Wallet = {
    currency: Currency;
    moves: Move[];
    lastUpdated: Date;
}

export type Move = {
    id: string;
    client: Client;    
    currency: Currency;
    date?: Date;
    income?: number;
    outcome?: number;
    description?: string;
}

export type Account = {
    id: string;
    currency: Currency;
    client: Client;
    debit: number;
    credit: number;
    description: string;
}
