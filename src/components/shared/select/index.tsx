

interface SelectProps {
    field: string;
    value: string;
    onChange: (name: string, value: string)=>void;
    options: any[];
    optionLabel: (value:any)=>string;
};

export const Component = ({field, options, value, onChange, optionLabel}: SelectProps) => {
    const itemsOptions = options.map((itemValue: any, index: number) => <option key={`key_dropdown_${index}_${itemValue.id}`} value={itemValue.id}>{optionLabel(itemValue)}</option>);
    return (
        <div className='py-4 flex items-center  justify-between text-start'>
            <label className="mb-2 w-[100px] capitalize" htmlFor={field}>{field}</label>
            <select name={field} className='text-black rounded-full p-5' value={value} onChange={({ target }) => onChange(target.name, target.value)}>
                <option value={""}>--select a value --</option>
                {itemsOptions}
            </select>
        </div>
    );
};


export default Component;

