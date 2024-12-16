import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {FormFieldProps} from "@/lib/entities";
import {FieldValues} from "react-hook-form";

const TextFormField = <TFormValues extends FieldValues,> ({ label, name, form }: FormFieldProps<TFormValues>) => (
    <div className="flex flex-col gap-2">
        <Label htmlFor={name as string}>
            {label}
        </Label>
        <div className="col-span-3">
            <Input className="w-full" id={name} {...form.register(name)} />
            {form.formState.errors[name] && (
                <p className="text-sm text-red-500">{form.formState.errors[name]?.message}</p>
            )}
        </div>
    </div>
);

export default TextFormField;