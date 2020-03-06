
"use strict";

$(document).ready(function() {
    getSalary();
    calcNewFund();
    reset();
    getDataFromLocal();
    storeLocale();
});

let salary;

function getSalary() {
    $('#calculate').click(function(e) {
        e.preventDefault();
       salary = parseFloat($('#salary').val());
       localStorage.setItem('sal', salary);
       prepareBuckets(salary);
    });
}

function getDataFromLocal() {
    let salary = localStorage.getItem('sal');
    let newValues = localStorage.getItem('newValues');

    console.log(salary, newValues);
    
}

function prepareBuckets(sal) {
    let expenses = new Object();
    expenses.necessity = (sal * 0.6).toFixed(2);
    expenses.emergency = (sal * 0.1).toFixed(2);
    expenses.improvement = (sal * 0.1).toFixed(2);
    expenses.investment = (sal * 0.1).toFixed(2);
    expenses.fun = (sal * 0.1).toFixed(2);

    $('#necessity').html(expenses.necessity);
    $('#emergency').html(expenses.emergency);
    $('#fun').html(expenses.fun);
    $('#improvement').html(expenses.improvement);
    $('#investment').html(expenses.investment);
}

function calcNewFund() {
    $('.deduct').click(function(e) {
        e.preventDefault();
        let ele = $(this);
        
        let parent = ele.parent();
        let child = parent.children('.input-exp');
        let expense = child.val();
        let expenseId = child.attr('id').split('-')[0];
        
        deductExpense(expense, expenseId);
    });
}

function deductExpense(amt, id) {
    let currentVal = $('#' + id + '').html();
    let newVal = (currentVal - amt).toFixed(2);
    $('#' + id + '').html(newVal);
}

function storeLocale() {
    $('#save').click(function() {
        let necessityVal = $('#necessity').html();
        let necessityId = 'necessity';

        let emergencyVal = $('#emergency').html();
        let emergencyId = 'emergency';

        let funVal = $('#fun').html();
        let funId = 'fun';

        let improvementVal = $('#improvement').html();
        let improvementId = 'improvement';

        let investmentVal = $('#investment').html();
        let investmentId = 'investment';


        let valArr = [{'id': necessityId, 'val': necessityVal}, {'id': emergencyId, 'val': emergencyVal}, {'id': improvementId, 'val': improvementVal}, {'id': investmentId, 'val': investmentVal}, { 'id': funId, 'val': funVal}];
        
        localStorage.setItem('newValues', valArr);
    });
}

function reset() {
    $('#reset').click(function(e) {
        e.preventDefault();
        $('input').val('');
        $('#necessity').html('');
        $('#emergency').html('');
        $('#fun').html('');
        $('#improvement').html('');
        $('#investment').html('');
    });
}