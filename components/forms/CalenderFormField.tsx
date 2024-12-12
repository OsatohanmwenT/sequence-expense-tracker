import {Label} from "@/components/ui/label";
import {FormFieldProps} from "@/components/forms/SelectCategoryField";
import {Controller} from "react-hook-form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {format, startOfDay} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

const CalenderFormField: React.FC<FormFieldProps> = ({ label, name, form }) => (
    <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={name} className="text-right">
            {label}
        </Label>
        <Controller
            name={name}
            control={form.control}
            render={({ field }) => (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "col-span-3 justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => {
                                field.onChange(date ? startOfDay(date) : null);
                            }}
                            disabled={(date) => {
                                const today = new Date();
                                const minDate = new Date("1900-01-01");
                                return date > today || date < minDate;
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            )}
        />
    </div>
);

export default CalenderFormField;