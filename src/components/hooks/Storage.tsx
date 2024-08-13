
type Entity = {
    id: string;
    [name: string]: any;
};

export const storageHook = (entityName: string) => {
    if(!sessionStorage) return;
    const getAll = () => {
        const allItems = JSON.parse(sessionStorage.getItem(entityName) || '{}');
        return allItems[entityName] || [];
    }

    const save = (items: Entity[]) => {
        const data = { [entityName]: items};
        sessionStorage.setItem(entityName, JSON.stringify(data));
    };

    const validateIfExists = (id: string) => {
        const allItems: Entity[] = getAll() as Entity[] || [];
        if(allItems.length > 0) {
            return allItems.filter((item)=>item.id === id).length > 0;
        }        
        return false;
    }

    const create = (entity:Entity) => {
        if(validateIfExists(entity.id)) throw new Error("Cant save to db, item already exists");
        const items = getAll();
        items.push(entity);
        save(items);
    }

    const remove = (entity:Entity) => {
        const items = getAll();
        const itemsFiltered = items.filter((item: Entity) => item.id !== entity.id);
        console.log(entity.id, itemsFiltered);
        save(itemsFiltered);
    }

    const clearAll = () => {
        save([]);
    }

    return {
        create,
        save,
        getAll,
        validateIfExists,
        remove,
        clearAll,
    }
}