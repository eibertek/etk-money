"use client";
import { useMove } from "@/components/hooks/Move";
import { storageHook } from "@/components/hooks/Storage";
import { Client, Currency } from "@/types/wallet";

export default function Dashboard(props: any) {
    const buildCurrencies = () => {
        storageHook('currencies').clearAll();
        storageHook('currencies').create({
            id: 'u$s',
            lastUpdate: new Date(),
            name: 'American Dollar',
            value: 1,
        });
        storageHook('currencies').create({
            id: 'A$r',
            lastUpdate: new Date(),
            name: 'Argentine Peso',
            value: 1000,
            value_from: 'u$s'
        });
        storageHook('currencies').create({
            id: 'JPN',
            lastUpdate: new Date(),
            name: 'Japan Yen',
            value: 1000,
            value_from: 'u$s'
        });

    };

    return (
        <div className="w-full text-center">
            <button onClick={buildCurrencies}>Rebuild currencies</button>
            <h1 className="py-5">Dashboard</h1>
        </div>
    );
}

