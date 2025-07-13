import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";

const FormField = ({ 
  label, 
  type = "text", 
  required = false, 
  error, 
  className = "",
  multiline = false,
  ...props 
}) => {
  const InputComponent = multiline ? Textarea : Input;
  
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      
      <InputComponent
        type={type}
        error={!!error}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;