"use client";
type Entity = {
    id: string;
    [name: string]: any;
};

export const storageHook = (entityName: string) => {    
    const getAll = () => {
        if(typeof sessionStorage === 'undefined') return;
        const allItems = JSON.parse(sessionStorage.getItem(entityName) || '{}');
        return allItems[entityName] || [];
    }

    const save = (items: Entity[]) => {
        if(typeof sessionStorage === 'undefined') return;
        const data = { [entityName]: items};
        sessionStorage.setItem(entityName, JSON.stringify(data));
    };

    const validateIfExists = (id: string) => {
        if(typeof sessionStorage === 'undefined') return;
        const allItems: Entity[] = getAll() as Entity[] || [];
        if(allItems.length > 0) {
            return allItems.filter((item)=>item.id === id).length > 0;
        }        
        return false;
    }

    const create = (entity:Entity) => {
        if(typeof sessionStorage === 'undefined') return;
        if(validateIfExists(entity.id)) throw new Error("Cant save to db, item already exists");
        const items = getAll();
        items.push(entity);
        save(items);
    }

    const remove = (entity:Entity) => {
        if(typeof sessionStorage === 'undefined') return;
        const items = getAll();
        const itemsFiltered = items.filter((item: Entity) => item.id !== entity.id);
        console.log(entity.id, itemsFiltered);
        save(itemsFiltered);
    }

    const clearAll = () => {
        if(typeof sessionStorage === 'undefined') return;
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