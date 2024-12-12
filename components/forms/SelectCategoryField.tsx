import {useState} from "react";
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
import AddCategoryDialog from "@/components/dialogs/CategoryDialog";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import CategoryDialog from "@/components/dialogs/CategoryDialog";
import SelectSkeleton from "@/components/skeletons/SelectSkeleton";

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
    const [addCategoryOpen, setAddCategoryOpen] = useState(false);

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
                        <SelectContent>
                            {isLoading ?
                                (
                                    <SelectSkeleton />
                                ) : (
                                    categories?.map((category) => (
                                        <SelectItem value={category.name} key={category.id}>{category.name}</SelectItem>
                                    )
                                ))}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => setAddCategoryOpen(true)}
                            >
                                <PlusCircle className="h-4 w-4" />
                                Other
                            </Button>
                        </SelectContent>
                    </Select>
                )}
            />
            <CategoryDialog
                open={addCategoryOpen}
                onOpenChange={setAddCategoryOpen}
            />
        </div>
    )
}