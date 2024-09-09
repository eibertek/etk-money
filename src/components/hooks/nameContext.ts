import { createContext } from "react";

const TitleContext = createContext({
    actualTitle: "",
    setTitle: (name: string)=>{}
});

export default TitleContext;