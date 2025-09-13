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
        Schema::create('boqs', function (Blueprint $table) {
            $table->id()->unique();
            $table->string('boqcode')->primary(); // As Key of Boq & get valued from projectcode&partno
            $table->string('projectcode'); // get from project table
            $table->string('partno'); // Value of part number
            $table->string('description'); // Description of the part
            $table->text('detail')->nullable(); // Additional details about the part
            $table->string('dimension')->nullable(); // Dimensions of the part
            $table->string('material')->nullable(); // Material used for the part
            $table->integer('qty'); // Quantity of the part
            $table->enum('unit', ['pc', 'pcs', 'm', 'kg', 'set', 'lot'])->default('lot'); // Unit of measurement
            $table->enum('type', ['material', 'labor', 'equipment'])->default('material'); // Type of the part
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boqs');
    }
};
