

interface InputProps {
    field: string;
    value: string;
    type?: string;
    onChange: (name: string, value: string)=>void;
};

export const Component = ({ field, type='text', value, onChange}:InputProps) => {
    return (
        <div className='py-4 flex items-center justify-between text-start'>
            <label className="mb-2 w-[100px] capitalize" htmlFor={field}>{field}</label>
            <input type={type} className="text-black rounded-full p-5" name={field} value={value} onChange={({ target }) => onChange(target.name, target.value)} />
        </div>
    );
};


export default Component;

