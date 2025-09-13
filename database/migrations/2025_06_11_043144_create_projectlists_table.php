<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projectlists', function (Blueprint $table) {
            $table->string('projectcode')->primary();
            $table->string('customer_code'); // foreign key to customers table
            $table->text('descriptionwork'); // description of project
            $table->string('projectcategory'); //category is SI, internal or PO
            $table->string('pono'); //Id of PO No, if projectcategory is PO
            $table->string('sino'); //Id of SI No, if projectcategory is SI
            $table->string('podate'); //Date of PO
            $table->string('orderdatereceived'); // Date of Order Receive
            $table->string('month'); // month of orderdatereceived
            $table->string('year'); // year of orderdatereceived
            $table->string('deliverydateaccordingtopo'); //finish date of PO
            $table->string('deliverydate'); //finsih date of PO, internal or SI
            $table->string('remark'); // other description of Project
            $table->string('location'); // location of Project can be site or workshop or site & workshop
            $table->string('lastpayment');
            $table->string('top1');
            $table->string('top2');
            $table->string('top3');
            $table->string('top4');
            $table->string('projectperformance');

            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('customer_code')->references('code')->on('customers')->onDelete('restrict');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('projects', function (Blueprint $table) {
        //     $table->dropForeign(['customername']); // Drop foreign key constraint
        // });
        Schema::dropIfExists('projectlists');
    }
};
