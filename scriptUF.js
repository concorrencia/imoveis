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

function _datatableSoExcel (idTabela, ordenaColuna, ordenaForma, tituloPlanilha, quantidadePagina = 10){
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
      },
  
      "dom": 'Bfrtip',
      "buttons": 
        [
          {
            extend: 'excel',
            text: 'Gerar Excel',
            title: tituloPlanilha, 
          },
        ],
    });
  }

$( document ).ready(function() {
    $('.loadingPagina').css('display', 'block')

    function uniqueByKey(dados, key) {
        return [...new Map(dados.map((x) => [x[key], x])).values()];
    }
            
    var cidades = uniqueByKey(dados, 'CIDADE');

    cidades.forEach(function(valores, index){
        var estadoSelecionado = valores.UF
        
        if(estadoPar = estadoSelecionado){
            var opcao = 
            `
                <option value="${valores.CIDADE}">${valores.CIDADE}</option>
            `
            $(opcao).appendTo('#select'+estadoPar);
        }
    })

    $(document).on('change', '#Estado', function(){

        $('.escolhaCidade').css('display','block');
        var dadosEstado = $(this).val();
        $('.opcoesCidades').css('display','none');
        $('#select'+dadosEstado).css('display','block');

        $(document).on('change', '#select'+dadosEstado, function(){
            
            var cidadeEscolhida = $(this).val()

            dados.forEach(function(item, index){

                var venda = item.VALOR_VENDA
                var valorMinimo = venda.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});
                var cidadeBancoDados = item.CIDADE
                var cidadeSemEspaco = cidadeBancoDados.replace(/\s/g, '');

                if (cidadeEscolhida == cidadeBancoDados){

                    $('#dadosUF').css('display','block');

                    var linha =
                        `<tr> 
                            <td class='${cidadeSemEspaco}'>${item.UF}</td> 
                            <td class='${cidadeSemEspaco}'>${item.CIDADE}</td> 
                            <td class='${cidadeSemEspaco}'>${item.ENDERECO_IMOVEL} - ${item.CEP}</td> 
                            <td class='${cidadeSemEspaco}'>${item.EMPREENDIMENTO}</td> 
                            <td class='${cidadeSemEspaco}'>${item.NU_IMOVEL}</td> 
                            <td class='${cidadeSemEspaco}'>${valorMinimo}</td> 
                            <td class='${cidadeSemEspaco}'>
                                <a href="${item.LINK}" target="_blank" class="btn btn-sm m-auto" role="button" style="background-color: #005ca9; color: white;">
                                    <small>Acesse o link</small>
                                </a>
                            </td> 
                        </tr>`;

                    $(linha).appendTo('#tblDadosUF>tbody');
                
                } else{
                    $('.'+cidadeSemEspaco).remove();
                }
            
            });
            // _datatableSoExcel('tblDadosUF', '0', 'asc', 'Imoveis Concorrencia Publica PAR', 10)
        });
    })

    $('.loadingPagina').css('display', 'none')
   
})
