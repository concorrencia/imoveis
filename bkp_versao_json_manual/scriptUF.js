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
        "decimal": ",",
        "thousands": ".",
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
      "columnDefs": [
        { "type": 'numeric-comma', "targets": 5 }
      ],
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

// function mascaraValor(valor) {
//     valor = valor.toString().replace(/\D/g,"");
//     valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
//     valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
//     valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
//     return valor                    
// }

function mascaraValor(valor) {
    valor = valor.replace(/\D/g,"");
    valor = valor.replace(/(\d)(\d{8})$/,"$1.$2");
    valor = valor.replace(/(\d)(\d{5})$/,"$1.$2");
    valor = valor.replace(/(\d)(\d{2})$/,"$1,$2");
    return valor                    
}

$( document ).ready(function() {
    $('.loadingPagina').css('display', 'block')

    function uniqueByKey(dados, key) {
        return [...new Map(dados.map((x) => [x[key], x])).values()];
    }
    
    var estados = uniqueByKey(dados, 'UF');

    estados.forEach(function(valores, index){
        var opcao = 
        `
            <option value="${valores.UF}">${valores.UF}</option>
        `
        $(opcao).appendTo('#Estado');
    })

    ordenarSelect('Estado')

    var opcaoDisabled = `<option disabled selected>Selecione o Estado</option>`
    $(opcaoDisabled).appendTo('#Estado');

    var cidades = uniqueByKey(dados, 'CIDADE');

    cidades.forEach(function(valores, index){
        var opcao = 
        `
            <option class="${valores.UF}dados optionsCidades" value="${valores.CIDADE}">${valores.CIDADE}</option>
        `
        $(opcao).appendTo('#selectCidades');
    })

    ordenarSelect('selectCidades')

    var opcaoDisabled = `<option class="selecioneCidade" disabled selected>Selecione a Cidade</option>`
    $(opcaoDisabled).appendTo('#selectCidades');

    $(document).on('change', '#Estado', function(){
        $('.escolhaCidade').css('display','none')
        $('.optionsCidades').css('display','none')
        $('.selecioneCidade').prop('selected', true);
       
        var estadoSelecionado = $(this).val();

        $(`.${estadoSelecionado}dados`).css('display','block')
        $('.escolhaCidade').css('display','block');
        $('.opcoesCidades').css('display','block');

        $(document).on('change', '#selectCidades', function(){
            $('#tblDadosUF').DataTable().clear().destroy();
            
            var cidadeEscolhida = $(this).val()

            dados.forEach(function(item, index){

                var venda = parseFloat(item.VALOR_VENDA);
                //var valorMinimo = venda.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});
                var valorFormatado = mascaraValor(venda.toFixed(2));
                //var valorVendaFormatado = String(venda.toFixed(2)).replace('.',',');

                var cidadeBancoDados = item.CIDADE
                var cidadeSemEspaco = cidadeBancoDados.replace(/\s/g, '');

                //var cidadeFormatado = (item.CIDADE).replace("'"," ");


                // if (item.NU_IMOVEL == '240021088' || item.NU_IMOVEL == '240020073') {
                //     var tipoLeilao = 'LICITAÇÃO ABERTA'
                // } else {
                //     var tipoLeilao = 'CONCORRÊNCIA PÚBLICA'
                // }

                if (cidadeEscolhida == cidadeBancoDados){

                    $('#dadosUF').css('display','block');

                    var linha =
                        `<tr> 
                            <td class='${cidadeSemEspaco}'>${item.UF}</td> 
                            <td class='${cidadeSemEspaco}'>${item.CIDADE}</td> 
                            <td class='${cidadeSemEspaco}'>${item.ENDERECO_IMOVEL} - ${item.CEP}</td> 
                            <td class='${cidadeSemEspaco}'>${item.EMPREENDIMENTO}</td> 
                            <td class='${cidadeSemEspaco}'>${item.NU_IMOVEL}</td> 
                            <td class='${cidadeSemEspaco}'>${valorFormatado}</td> 
                            <td class='${cidadeSemEspaco}'>${item.AGRUPAMENTO}</td> 
                            <td class='${cidadeSemEspaco}'>${item.STATUS_IMOVEL}</td> 
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
            
            _datatableSoExcel('tblDadosUF', '5', 'asc', 'imoveis_concorrencia_publica_licitacao_aberta_par', 10)

            // _datatableSoExcel('tblDadosUF', '0', 'asc', 'Imoveis Concorrencia Publica PAR', 10)
            // _datatable('tblDadosUF', '0', 'asc', 10)
        });
    })

    $('.loadingPagina').css('display', 'none')
   
})

function ordenarSelect(id_componente)
{
    var selectToSort = jQuery('#' + id_componente);
    var optionActual = selectToSort.val();
    selectToSort.html(selectToSort.children('option').sort(function (a, b) {
        return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
    })).val(optionActual);
}
