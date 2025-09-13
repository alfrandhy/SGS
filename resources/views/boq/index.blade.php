@extends('layouts.app')

@section('template_title')
    Boq
@endsection

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <div style="display: flex; justify-content: space-between; align-items: center;">

                            <span id="card_title">
                                {{ __('Boq') }}
                            </span>

                             <div class="float-right">
                                <a href="{{ route('boqs.create') }}" class="btn btn-primary btn-sm float-right"  data-placement="left">
                                  {{ __('Create New') }}
                                </a>
                              </div>
                        </div>
                    </div>
                    @if ($message = Session::get('success'))
                        <div class="alert alert-success m-4">
                            <p>{{ $message }}</p>
                        </div>
                    @endif

                    <div class="card-body bg-white">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="thead">
                                    <tr>
                                        <th>No</th>
                                        
										<th>Projectcode</th>
										<th>Partno</th>
										<th>Description</th>
										<th>Material</th>
										<th>Dimension</th>
										<th>Qty</th>
										<th>Unit</th>
										<th>Type</th>
										<th>Created By</th>
										<th>Updated By</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($boqs as $boq)
                                        <tr>
                                            <td>{{ ++$i }}</td>
                                            
											<td>{{ $boq->projectcode }}</td>
											<td>{{ $boq->partno }}</td>
											<td>{{ $boq->description }}</td>
											<td>{{ $boq->material }}</td>
											<td>{{ $boq->dimension }}</td>
											<td>{{ $boq->qty }}</td>
											<td>{{ $boq->unit }}</td>
											<td>{{ $boq->type }}</td>
											<td>{{ $boq->created_by }}</td>
											<td>{{ $boq->updated_by }}</td>

                                            <td>
                                                <form action="{{ route('boqs.destroy',$boq->id) }}" method="POST">
                                                    <a class="btn btn-sm btn-primary " href="{{ route('boqs.show',$boq->id) }}"><i class="fa fa-fw fa-eye"></i> {{ __('Show') }}</a>
                                                    <a class="btn btn-sm btn-success" href="{{ route('boqs.edit',$boq->id) }}"><i class="fa fa-fw fa-edit"></i> {{ __('Edit') }}</a>
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-danger btn-sm"><i class="fa fa-fw fa-trash"></i> {{ __('Delete') }}</button>
                                                </form>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {!! $boqs->links() !!}
            </div>
        </div>
    </div>
@endsection
