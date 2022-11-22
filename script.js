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

function mascaraValor(valor) {
  valor = valor.toString().replace(/\D/g,"");
  valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
  valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
  valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
  return valor                    
}

$( document ).ready(function() {
  $('.loadingPagina').css('display', 'block')
    
  dados.forEach(function(item, index){
    var venda = item.VALOR_VENDA
    var valorMinimo = venda.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});

    // if (item.NU_IMOVEL == '240021088' || item.NU_IMOVEL == '240020073') {
    //   var tipoLeilao = 'LICITAÇÃO ABERTA'
    // } else {
    //   var tipoLeilao = 'CONCORRÊNCIA PÚBLICA'
    // }
    
    var valorFormatado = mascaraValor(venda.toFixed(2))
    var linha =
      `
        <tr> 
          <td>${item.UF}</td> 
          <td>${item.CIDADE}</td> 
          <td>${item.ENDERECO_IMOVEL} - ${item.CEP}</td> 
          <td>${item.EMPREENDIMENTO}</td> 
          <td>${item.NU_IMOVEL}</td> 
          <td>${valorFormatado}</td> 
          <td>${item.AGRUPAMENTO}</td> 
          <td>
            <a href="${item.LINK}" target="_blank" class="btn btn-sm m-auto" role="button" style="background-color: #005ca9; color: white;">
              <small>Acesse o link</small>
            </a>
          </td> 
        </tr>
      `;
      
    $(linha).appendTo('#tblImoveisPar>tbody');
  });

  // _datatable('tblImoveisPar', '0', 'asc', 10)
  _datatableSoExcel('tblImoveisPar', '5', 'asc', 'imoveis_concorrencia_publica_licitacao_aberta_par', 10)
  $('.loadingPagina').css('display', 'none')
   
})