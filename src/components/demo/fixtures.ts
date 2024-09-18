import { Client, Currency, Move } from "@/types/wallet";

interface IStorageData {
    clients?: Client[];
    moves?: Move[];
    currencies?: Currency[];
}
const storageFixtures: IStorageData = {
    clients: [],
    moves: [],
    currencies: [
        {
            "id": "u$s",
            "lastUpdate": new Date("2024-08-13T19:36:39.789Z"),
            "name": "American Dollar",
            "value": 1
        },
        {
            "id": "A$r",
            "lastUpdate": new Date("2024-08-13T19:36:39.789Z"),
            "name": "Argentine Peso",
            "value": 1000,
            "value_from": "u$s"
        },
        {
            "id": "JPN",
            "lastUpdate": new Date("2024-08-13T19:36:39.789Z"),
            "name": "Japan Yen",
            "value": 1000,
            "value_from": "u$s"
        }
    ]
}

export default storageFixtures;