<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $code = $this->customer->code ?? '';

        return [
            'name' => 'required|string|max:255|unique:customers,name,' . $code . ',code',
            'code' => 'required|string|max:50|unique:customers,code,' . $code . ',code',
            'telp' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'customer_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'Customer name is required.',
            'name.unique' => 'Customer name already exists.',
            'code.required' => 'Customer code is required.',
            'code.unique' => 'Customer code already exists.',
            'customer_logo.image' => 'Customer logo must be an image.',
            'customer_logo.mimes' => 'Customer logo must be a file of type: jpeg, png, jpg, gif.',
            'customer_logo.max' => 'Customer logo must not be larger than 2MB.',
        ];
    }
}
