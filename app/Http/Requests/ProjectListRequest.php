<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectListRequest extends FormRequest
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
        $rules = [
            'projectcode' => 'required|string|max:50|unique:projectlists,projectcode',
            'customer_code' => 'required|string|exists:customers,code',
            'descriptionwork' => 'required|string|max:1000',
            'projectcategory' => 'required|string|in:SI,internal,PO',
            'pono' => 'nullable|string|max:100',
            'sino' => 'nullable|string|max:100',
            'podate' => 'nullable|date',
            'orderdatereceived' => 'required|date',
            'month' => 'required|string|max:20',
            'year' => 'required|string|max:4',
            'deliverydateaccordingtopo' => 'nullable|date',
            'deliverydate' => 'nullable|date',
            'remark' => 'nullable|string|max:500',
            'location' => 'nullable|string|max:200',
            'lastpayment' => 'nullable|string|max:100',
            'top1' => 'nullable|string|max:100',
            'top2' => 'nullable|string|max:100',
            'top3' => 'nullable|string|max:100',
            'top4' => 'nullable|string|max:100',
            'projectperformance' => 'nullable|string|max:100',
        ];

        // If updating, ignore unique rule for current project
        if ($this->method() === 'PUT' || $this->method() === 'PATCH') {
            $projectCode = $this->route('project_list')?->projectcode ?? $this->projectcode;
            $rules['projectcode'] = 'required|string|max:50|unique:projectlists,projectcode,' . $projectCode . ',projectcode';
        }

        return $rules;
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'projectcode.required' => 'Project code is required.',
            'projectcode.unique' => 'Project code already exists.',
            'customer_code.required' => 'Customer is required.',
            'customer_code.exists' => 'Selected customer does not exist.',
            'descriptionwork.required' => 'Description of work is required.',
            'projectcategory.required' => 'Project category is required.',
            'projectcategory.in' => 'Project category must be SI, internal, or PO.',
            'orderdatereceived.required' => 'Order date received is required.',
            'orderdatereceived.date' => 'Order date received must be a valid date.',
            'month.required' => 'Month is required.',
            'year.required' => 'Year is required.',
        ];
    }
}
