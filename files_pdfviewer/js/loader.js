function hidePDFviewer() {
	$('#content table').show();
	$("#controls").show();
	$("#editor").show();
	$('#pdframe, #pdfbar').remove();
}

function showPDFviewer(dir,filename){
	if(!showPDFviewer.shown){
		$("#editor").hide();
		$('#content table').hide();
		$("#controls").hide();
		var oldcontent = $("#content").html();
		var viewer = OC.linkTo('files_pdfviewer', 'viewer.php')+'?dir='+encodeURIComponent(dir).replace(/%2F/g, '/')+'&file='+encodeURIComponent(filename.replace('&', '%26'));
		$("#content").append('<iframe id="pdframe" style="width:100%;height:100%;display:block;" src="'+viewer+'" /><div id="pdfbar"><a id="close" title="Close">X</a></div>');
		$("#pageWidthOption").attr("selected","selected");
		$('#pdfbar').css({position:'absolute',top:'6px',right:'5px'});
		$('#close').css({display:'block',padding:'0 5px',color:'#BBBBBB','font-weight':'900','font-size':'16px',height:'18px',background:'transparent'}).click(function(){
			hidePDFviewer();
		});
	}

}
showPDFviewer.oldCode='';
showPDFviewer.lastTitle='';

$(document).ready(function(){
	// doesn't work in IE or public link mode
	if(!$.browser.msie && !$('#isPublic').val()){
		if($('#filestable').length > 0 && typeof FileActions!=='undefined'){
			FileActions.register('application/pdf','Edit', OC.PERMISSION_READ, '',function(filename){
				showPDFviewer($('#dir').val(),filename);
			});
			FileActions.setDefault('application/pdf','Edit');
		}
	}
});
