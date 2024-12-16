import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {FormFieldProps} from "@/lib/entities";

const NumberFormField= <TFormValues,> ({ label, name, form }: FormFieldProps<TFormValues>) => (
    <div className="flex flex-col gap-2">
        <Label htmlFor={name as string}>
            {label}
        </Label>
        <div className="col-span-3">
            <Input
                id={name as string}
                type="number"
                {...form.register(name, { valueAsNumber: true })}
            />
            {form.formState.errors[name] && (
                <p className="text-sm text-red-500">{form.formState.errors[name]?.message}</p>
            )}
        </div>
    </div>
);

export default NumberFormField;