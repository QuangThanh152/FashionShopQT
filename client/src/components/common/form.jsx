"use client"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || ""

    if (getControlItem.componentType === "input") {
      return (
        <div className="relative">
          {getControlItem.icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {getControlItem.icon}
            </div>
          )}
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) => setFormData((prev) => ({ ...prev, [getControlItem.name]: event.target.value }))}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ${getControlItem.icon ? "pl-10" : ""}`}
          />
        </div>
      )
    } else if (getControlItem.componentType === "select") {
      return (
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              [getControlItem.name]: value,
            }))
          }
          value={value || ""}
        >
          <SelectTrigger className="w-full px-4 py-2 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <SelectValue placeholder={getControlItem.label} />
          </SelectTrigger>
          <SelectContent>
            {getControlItem.options?.map((optionItem) => (
              <SelectItem key={optionItem.id} value={optionItem.id}>
                {optionItem.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    } else if (getControlItem.componentType === "textarea") {
      return (
        <Textarea
          name={getControlItem.name}
          placeholder={getControlItem.placeholder}
          id={getControlItem.name}
          value={value}
          onChange={(event) => setFormData((prev) => ({ ...prev, [getControlItem.name]: event.target.value }))}
          className="w-full px-4 py-2 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      )
    }

    return null
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label
              className="block mb-1 text-sm font-semibold text-left text-gray-800" // Thêm text-left để căn trái
              htmlFor={controlItem.name}
            >
              {controlItem.label}
            </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>

      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="w-full px-4 py-2 mt-4 text-white transition-all duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  )
}

export default CommonForm