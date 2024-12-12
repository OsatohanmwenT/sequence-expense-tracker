import {Label} from "@/components/ui/label";
import {FormFieldProps} from "@/components/forms/SelectCategoryField";
import {Input} from "@/components/ui/input";

const TextFormField: React.FC<FormFieldProps> = ({ label, name, form }) => (
    <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={name} className="text-right">
            {label}
        </Label>
        <div className="col-span-3">
            <Input id={name} {...form.register(name)} />
            {form.formState.errors[name] && (
                <p className="text-sm text-red-500">{form.formState.errors[name]?.message}</p>
            )}
        </div>
    </div>
);

export default TextFormField;