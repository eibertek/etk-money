import { Client, Currency, Move } from "@/types/wallet";

interface IStorageData {
    clients?: Client[];
    moves?: Move[];
    currencies?: Currency[];
}
const storageFixtures: IStorageData = {
    clients: [
        {
            "id": "e61b89df8a71fd63a3fe6498c42afcfcd28756e46e598c9b2eb907f722fbc416",
            "companyName": "Light",
            "name": "",
            "lastName": "",
            "address": "",
            "type": "Service"
        },
        {
            "id": "e3519c19040f1037847914baa8934c9520931153e2d20a9286d01b888c54d02d",
            "companyName": "Gas",
            "name": "",
            "lastName": "",
            "address": "",
            "type": "Service"
        },
        {
            "id": "bfd8487e97ffdb671b7f54c60ff9915a6e73c206c008908b0bbee64af8c43aaf",
            "companyName": "Rent",
            "name": "",
            "lastName": "",
            "address": "",
            "type": "Service"
        },
        {
            "id": "ed3f49cf46668ef8fba717cfae3fe7fb86c65ba3021e71024003bbccfd2983a2",
            "companyName": "Visa",
            "name": "",
            "lastName": "",
            "address": "",
            "type": "Company"
        },
        {
            "id": "29ce73737833f2ccf2a902657dd8a48f5d706edd822e67bb43bc0c4945528c8b",
            "companyName": "Personal",
            "name": "",
            "lastName": "",
            "address": "",
            "type": "Company"
        }
    ],
    moves: [
        {
            "id": "01bccac5ad4087e23e3ab6e9e2168d8dee3d3e10cd7148149918ddec4fa562a6",
            "client": "e61b89df8a71fd63a3fe6498c42afcfcd28756e46e598c9b2eb907f722fbc416",
            "currency": "A$r",
            "date": new Date("2024-08-13"),
            "description": "June Light",
            "income": 0,
            "outcome": 15000
        },
        {
            "id": "65ed669a3be66926e02f96c2f9c8f527109ca563d9b7225046dbdc8e801574c0",
            "client": "e3519c19040f1037847914baa8934c9520931153e2d20a9286d01b888c54d02d",
            "currency": "A$r",
            "date": new Date("2024-08-13"),
            "description": "June Gas",
            "income": 0,
            "outcome": 2000
        },
        {
            "id": "eac1b9950780ffc8c994c2015ad2630c83067dccf793ec4966d551dcbb5bf1ae",
            "client": "29ce73737833f2ccf2a902657dd8a48f5d706edd822e67bb43bc0c4945528c8b",
            "currency": "A$r",
            "date": new Date("2024-08-13"),
            "description": "Credit card ",
            "income": 0,
            "outcome": 2600000
        },
        {
            "id": "8d378e2d962264e88116283376c4019de4d33e16dbc023d1de4e9f60c94471fd",
            "client": "29ce73737833f2ccf2a902657dd8a48f5d706edd822e67bb43bc0c4945528c8b",
            "currency": "u$s",
            "date": new Date("2024-08-13"),
            "description": "June Income",
            "income": 2000,
            "outcome": 0
        },
        {
            "id": "f1ff819614cb06105510a5e4dc5e7a660cd5d28fa651575d0ffa45942ff9e9f6",
            "client": "29ce73737833f2ccf2a902657dd8a48f5d706edd822e67bb43bc0c4945528c8b",
            "currency": "u$s",
            "date": new Date("2024-06-13"),
            "description": "May Income",
            "income": 3500,
            "outcome": 0
        },        
        {
            "id": "ce10233d1e57a11d1826b46694f8c5562b9b13edb35e21960576d068ee4cc764",
            "client": "bfd8487e97ffdb671b7f54c60ff9915a6e73c206c008908b0bbee64af8c43aaf",
            "currency": "u$s",
            "date": new Date("2024-08-13"),
            "description": "Apartment",
            "income": 0,
            "outcome": 1300
        }
    ],
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