import {Category} from "@/lib/entities";
import { Label } from "@/components/ui/label"
import {ExpenseFormValues} from "@/lib/schemas";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Controller, useForm} from "react-hook-form";
import SelectSkeleton from "@/components/skeletons/SelectSkeleton";
import AddCategory from "@/components/Buttons/AddCategory";

export interface FormFieldProps {
    label: string;
    name: keyof ExpenseFormValues;
    form: ReturnType<typeof useForm<ExpenseFormValues>>;
}

interface CategoryFormFieldProps extends Omit<FormFieldProps, 'name'> {
    categories: Category[] | undefined;
    isLoading: boolean
}

export const CategoryFormField: React.FC<CategoryFormFieldProps> = ({ label, form, categories, isLoading }) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
                {label}
            </Label>
            <Controller
                name="category_name"
                control={form.control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[400px] overflow-y-auto">
                            <div className="space-y-1">
                                {isLoading ? (
                                    <SelectSkeleton />
                                ) : (
                                    categories?.map((category) => (
                                        <SelectItem value={category.name} key={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))
                                )}
                            </div>
                            <div className="pt-2 border-t mt-2">
                                <AddCategory type="Other" />
                            </div>
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    )
}