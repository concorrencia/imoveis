
d = new Date();
hour = d.getHours();

if(hour < 6){
    document.getElementById('saudacao').innerText = "boa noite!";
}else if(hour < 12){
    document.getElementById('saudacao').innerText = "bom dia!";
}else if(hour < 18){
    document.getElementById('saudacao').innerText = "boa tarde!";
}else{
    document.getElementById('saudacao').innerText = "boa noite!";
};

function _datatable (idTabela, ordenaColuna, ordenaForma, quantidadePagina = 10){
    $('#' + idTabela).DataTable({
        "order": [[ ordenaColuna, ordenaForma ]],
        "pageLength": quantidadePagina,
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "Mostrar _MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }
    });
}

$( document ).ready(function() {
    
    data.forEach(function(item, index){
        var venda = item.VALOR_VENDA
        var valorMinimo = venda.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});

        var linha =
            `<tr> 
                <td>${item.UF}</td> 
                <td>${item.CIDADE}</td> 
                <td>${item.ENDERECO_IMOVEL} - ${item.CEP}</td> 
                <td>${item.EMPREENDIMENTO}</td> 
                <td>${item.NU_IMOVEL}</td> 
                <td>R$ ${valorMinimo}</td> 
                <td>
                    <a href="${item.LINK}" target="_blank" class="btn btn-sm m-auto" role="button" style="background-color: #005ca9; color: white;">
                        <small>Acesse o link</small>
                    </a>
                </td> 
            </tr>`;
        
        $(linha).appendTo('#tblImoveisPar>tbody');
    });

    _datatable('tblImoveisPar', '0', 'asc', 10)
    $('.loadingPagina').css('display', 'none')

})


function mostraTudo(){
    $('#tabelaGeral').css("display", "block");
    // $('#dadosAdm').css('display','none');
    // $('#Estado').val('');
}