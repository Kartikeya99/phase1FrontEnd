var stateBatchCreation = 0;

function createBatchButton(){
	if (!stateBatchCreation){
		$("#createBatch").css("display", "none");
		$("#removeModal").css("display", "block");
		$("#createBatchButtonModal").css("display", "block");
	}
	else{
		$("#createBatch").css("display", "block");
		$("#removeModal").css("display", "none");
		$("#createBatchButtonModal").css("display", "none");
	}
	stateBatchCreation = (stateBatchCreation+1)%2;
}

function batchCreationDialog(){
	createBatchButton();
	$("#batchCreationDialogModal").css("display", "block");
}

function closeBatchCreateDialog(){
	$("#batchCreationDialogModal").css("display", "none");
}