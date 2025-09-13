<div class="row padding-1 p-1">
    <div class="col-md-12">
        
        <div class="form-group mb-2 mb20">
            <label for="projectcode" class="form-label">{{ __('Projectcode') }}</label>
            <input type="text" name="projectcode" class="form-control @error('projectcode') is-invalid @enderror" value="{{ old('projectcode', $boq?->projectcode) }}" id="projectcode" placeholder="Projectcode">
            {!! $errors->first('projectcode', '<div class="invalid-feedback" role="alert"><strong>:message</strong></div>') !!}
        </div>
        <div class="form-group mb-2 mb20">
            <label for="partno" class="form-label">{{ __('Partno') }}</label>
            <input type="text" name="partno" class="form-control @error('partno') is-invalid @enderror" value="{{ old('partno', $boq?->partno) }}" id="partno" placeholder="Partno">
            {!! $errors->first('partno', '<div class="invalid-feedback" role="alert"><strong>:message</strong></div>') !!}
        </div>
        <div class="form-group mb-2 mb20">
            <label for="description" class="form-label">{{ __('Description') }}</label>
            <input type="text" name="description" class="form-control @error('description') is-invalid @enderror" value="{{ old('description', $boq?->description) }}" id="description" placeholder="Description">
            {!! $errors->first('description', '<div class="invalid-feedback" role="alert"><strong>:message</strong></div>') !!}
        </div>
        <div class="form-group mb-2 mb20">
            <label for="material" class="form-label">{{ __('Material') }}</label>
            <input type="text" name="material" class="form-control @error('material') is-invalid @enderror" value="{{ old('material', $boq?->material) }}" id="material" placeholder="Material">
            {!! $errors->first('material', '<div class="invalid-feedback" role="alert"><strong>:message</strong></div>') !!}
        </div>
        <div class="form-group mb-2 mb20">
            <label for="dimension" class="form-label">{{ __('Dimension') }}</label>
            <input type="text" name="dimension" class="form-control @error('dimension') is-invalid @enderror" value="{{ old('dimension', $boq?->dimension) }}" id="dimension" placeholder="Dimension">
            {!! $errors->first('dimension', '<div class="invalid-feedback" role="alert"><strong>:message</strong></div>') !!}
        </div>
        <div class="form-group mb-2 mb20">
            <label for="qty" class="form-label">{{ __('Qty') }}</label>
            <input type="text" name="qty" class="form-control @error('qty') is-invalid @enderror" value="{{ old('qty', $boq?->qty) }}" id="qty" placeholder="Qty">
            {!! $errors->first('qty', '<div class="invalid-feedback" role="alert"><strong>:message</strong></div>') !!}
        </div>
        <div class="form-group mb-2 mb20">
            <label for="unit" class="form-label">{{ __('Unit') }}</label>
            <input type="text" name="unit" class="form-control @error('unit') is-invalid @enderror" value="{{ old('unit', $boq?->unit) }}" id="unit" placeholder="Unit">
            {!! $errors->first('unit', '<div class="invalid-feedback" role="alert"><strong>:message</strong></div>') !!}
        </div>
        <div class="form-group mb-2 mb20">
            <label for="type" class="form-label">{{ __('Type') }}</label>
            <input type="text" name="type" class="form-control @error('type') is-invalid @enderror" value="{{ old('type', $boq?->type) }}" id="type" placeholder="Type">
            {!! $errors->first('type', '<div class="invalid-feedback" role="alert"><strong>:message</strong></div>') !!}
        </div>
        <div class="form-group mb-2 mb20">
            <label for="created_by" class="form-label">{{ __('Created By') }}</label>
            <input type="text" name="created_by" class="form-control @error('created_by') is-invalid @enderror" value="{{ old('created_by', $boq?->created_by) }}" id="created_by" placeholder="Created By">
            {!! $errors->first('created_by', '<div class="invalid-feedback" role="alert"><strong>:message</strong></div>') !!}
        </div>
        <div class="form-group mb-2 mb20">
            <label for="updated_by" class="form-label">{{ __('Updated By') }}</label>
            <input type="text" name="updated_by" class="form-control @error('updated_by') is-invalid @enderror" value="{{ old('updated_by', $boq?->updated_by) }}" id="updated_by" placeholder="Updated By">
            {!! $errors->first('updated_by', '<div class="invalid-feedback" role="alert"><strong>:message</strong></div>') !!}
        </div>

    </div>
    <div class="col-md-12 mt20 mt-2">
        <button type="submit" class="btn btn-primary">{{ __('Submit') }}</button>
    </div>
</div>