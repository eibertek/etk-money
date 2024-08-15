

interface SelectProps {
    field: string;
    value: string;
    allowEmpty?: boolean;
    onChange: (name: string, value: string)=>void;
    options: any[];
    optionLabel: (value:any)=>string;
};

export const Component = ({field, options, value, onChange, allowEmpty, optionLabel}: SelectProps) => {
    const itemsOptions = options.map((itemValue: any, index: number) => <option key={`key_filter_${index}_${itemValue.id}`} value={itemValue.id}>{optionLabel(itemValue)}</option>);
    return (
        <div className='py-4 flex flex-col items-center text-start'>
            <label className="mb-2 w-[100px] capitalize" htmlFor={field}>{field}</label>
            <select name={field} className='text-black' value={value} onChange={({ target }) => onChange(target.name, target.value)}>
                {allowEmpty && <option value={""}>--select a value --</option>}
                {itemsOptions}
            </select>
        </div>
    );
};


export default Component;

