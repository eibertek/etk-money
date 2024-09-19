export const CLIENT_TYPES = ['Client', 'Person', 'Company', 'Service'] as const;

export const MOVE_TYPES = {
    'income': 'I',
    'outcome': 'O'
};

export type Client = {
    id: string;
    name?: string;
    lastName?: string;
    address?: string;
    type: typeof CLIENT_TYPES[number];        
}

export type Currency = {
    id: string;
    name: string;
    value_from?: Currency["id"];
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
    client: Client["id"];    
    currency: Currency["id"];
    date?: Date;
    amount?: number;
    type?: 'I' | 'O';
    description?: string;
}

export type Account = {
    id: string;
    currency: Currency;
    client: Client;
    total: number;
    description: string;
}
