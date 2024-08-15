import Input from '@/components/shared/filters/input';

interface IRangeProps {
    field: string;
    onChange: (name: string, value: string)=>void;
    type: string;
    value?: { from: number, to: number };
}

export const Range  = (props: IRangeProps) => {

    const { onChange, field, value, type } = props;
    return (
        <div>
            <div><Input field={`${field}_from`} value={value?.from} type={type} onChange={onChange} /></div>
            <div><Input field={`${field}_to`} value={value?.to} type={type} onChange={onChange} /></div>
        </div>
    );
}

export default Range;