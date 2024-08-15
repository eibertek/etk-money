

interface InputProps {
    field: string;
    value?: string | number;
    type?: string;
    onChange: (name: string, value: string)=>void;
};

export const Component = ({ field, type='text', value, onChange}:InputProps) => {
    return (
        <div className='py-4 flex flex-col items-center text-start'>
            <label className="w-[100px] capitalize" htmlFor={field}>{field}</label>
            <input type={type} className="text-black" name={field} value={value} onChange={({ target }) => onChange(target.name, target.value)} />
        </div>
    );
};


export default Component;

