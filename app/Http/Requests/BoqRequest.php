<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BoqRequest extends FormRequest
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
        $id = $this->boq->id ?? 0;  // 0 assumes no existing id, i.e. creating new record

        return [
            'boqcode' => "required|string|unique:boqs,boqcode," . $id,
            'projectcode' => 'required|string',
            'partno' => 'required|string',
            'description' => 'required|string',
            'detail' => 'nullable|string',
            'dimension' => 'nullable|string',
            'material' => 'nullable|string',
            'qty' => 'required|integer',
            'unit' => 'required|string|in:pc,pcs,m,kg,set,lot',
            'type' => 'required|string|in:material,labor,construction',
        ];
    }
}
