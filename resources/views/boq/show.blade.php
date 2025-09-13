@extends('layouts.app')

@section('template_title')
    {{ $boq->name ?? __('Show') . " " . __('Boq') }}
@endsection

@section('content')
    <section class="content container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="float-left">
                            <span class="card-title">{{ __('Show') }} Boq</span>
                        </div>
                        <div class="float-right">
                            <a class="btn btn-primary btn-sm" href="{{ route('boqs.index') }}"> {{ __('Back') }}</a>
                        </div>
                    </div>

                    <div class="card-body bg-white">
                        
                        <div class="form-group mb-2 mb20">
                            <strong>Projectcode:</strong>
                            {{ $boq->projectcode }}
                        </div>
                        <div class="form-group mb-2 mb20">
                            <strong>Partno:</strong>
                            {{ $boq->partno }}
                        </div>
                        <div class="form-group mb-2 mb20">
                            <strong>Description:</strong>
                            {{ $boq->description }}
                        </div>
                        <div class="form-group mb-2 mb20">
                            <strong>Material:</strong>
                            {{ $boq->material }}
                        </div>
                        <div class="form-group mb-2 mb20">
                            <strong>Dimension:</strong>
                            {{ $boq->dimension }}
                        </div>
                        <div class="form-group mb-2 mb20">
                            <strong>Qty:</strong>
                            {{ $boq->qty }}
                        </div>
                        <div class="form-group mb-2 mb20">
                            <strong>Unit:</strong>
                            {{ $boq->unit }}
                        </div>
                        <div class="form-group mb-2 mb20">
                            <strong>Type:</strong>
                            {{ $boq->type }}
                        </div>
                        <div class="form-group mb-2 mb20">
                            <strong>Created By:</strong>
                            {{ $boq->created_by }}
                        </div>
                        <div class="form-group mb-2 mb20">
                            <strong>Updated By:</strong>
                            {{ $boq->updated_by }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
