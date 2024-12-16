import {Category, FormFieldProps} from "@/lib/entities";
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Controller, FieldValues} from "react-hook-form";
import SelectSkeleton from "@/components/skeletons/SelectSkeleton";
import AddCategory from "@/components/Buttons/AddCategory";

interface CategoryFormFieldProps<TFormValues extends FieldValues> extends Omit<FormFieldProps<TFormValues>, "name">{
    categories: Category[] | undefined;
    isLoading: boolean
}

export const CategoryFormField = <TFormValues,>({ label, form, categories, isLoading }: CategoryFormFieldProps<TFormValues>) => {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="category">
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