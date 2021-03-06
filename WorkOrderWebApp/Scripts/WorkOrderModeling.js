/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/jqueryui/jqueryui.d.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />
var WorkOrderModeling;
(function (WorkOrderModeling) {
    var WorkOrderModel = (function () {
        function WorkOrderModel() {
            this.ID = ko.observable();
            this.Site = ko.observable();
            this.Job = ko.observable();
            this.SubmittedByUserID = ko.observable();
            this.SubmittedByFirstName = ko.observable();
            this.SubmittedByLastName = ko.observable();
            this.SubmittedBy = ko.pureComputed(function () {
                return this.SubmittedByFirstName() + (this.SubmittedByLastName().length > 0 ? ' ' : '') + this.SubmittedByLastName();
            }, this);
            this.SubmittedDate = ko.observable();
            this.Subject = ko.observable();
            this.Description = ko.observable();
            this.Reviewed = ko.observable();
            this.LastUpdatedBy = ko.observable();
            this.LastUpdatedDate = ko.observable();
            this.RegHoursWorked = ko.observable();
            this.RegHoursWorkedFrmtd = ko.pureComputed(function () {
                return Formatting.ConvertNumberToHours(this.RegHoursWorked());
            }, this);
            this.OvertimeHoursWorked = ko.observable();
            this.OvertimeHoursWorkedFrmtd = ko.pureComputed(function () {
                return Formatting.ConvertNumberToHours(this.OvertimeHoursWorked());
            }, this);
        }
        return WorkOrderModel;
    })();
    WorkOrderModeling.WorkOrderModel = WorkOrderModel;
    WorkOrderModeling.WorkOrderActions = function (data) {
        var self = this;
        self.recordsPerPage = 25;
        self.pageNumber = ko.observable(0);
        self.allWorkOrders = ko.observableArray();
        self.loadWorkOrders = function (d) {
            if (d != undefined) {
                var jsonArray = JSON.parse(d);
                for (var i = 0; i < jsonArray.length; i++) {
                    var item = new WorkOrderModel();
                    item.ID(jsonArray[i].ID);
                    item.Site(jsonArray[i].Site);
                    item.Job(jsonArray[i].Job);
                    item.SubmittedByUserID(jsonArray[i].SubmittedByUserID);
                    item.SubmittedByFirstName(jsonArray[i].SubmittedByFirstName);
                    item.SubmittedByLastName(jsonArray[i].SubmittedByLastName);
                    item.SubmittedDate(Formatting.FormatDateTime(jsonArray[i].SubmittedDate));
                    item.Subject(jsonArray[i].Subject);
                    item.Description(jsonArray[i].Description);
                    item.Reviewed(jsonArray[i].Reviewed);
                    item.LastUpdatedBy(Formatting.HandlePossibleStringDBNull(jsonArray[i].LastUpdatedBy));
                    item.LastUpdatedDate(Formatting.HandlePossibleStringDBNull(Formatting.FormatDateTime(jsonArray[i].LastUpdatedDate)));
                    item.RegHoursWorked(jsonArray[i].RegHoursWorked);
                    item.OvertimeHoursWorked(jsonArray[i].OvertimeHoursWorked);
                    self.allWorkOrders.push(item);
                }
                self.alterWorkOrdersView(true);
            }
        };
        self.workOrdersView = ko.observableArray();
        self.sort = function (column, sortDescending) {
            switch (column) {
                case "hID":
                    viewModel.wo.workOrdersView.sort(function (a, b) {
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hSite":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.Site() !== b.Site())
                            return sortDescending ? Formatting.sortDesc(a.Site(), b.Site()) : Formatting.sortAsc(a.Site(), b.Site());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hJob":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.Job() !== b.Job())
                            return sortDescending ? Formatting.sortDesc(a.Job(), b.Job()) : Formatting.sortAsc(a.Job(), b.Job());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hSubBy":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.SubmittedBy() !== b.SubmittedBy())
                            return sortDescending ? Formatting.sortDesc(a.SubmittedBy(), b.SubmittedBy()) : Formatting.sortAsc(a.SubmittedBy(), b.SubmittedBy());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hSubDt":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.SubmittedDate() !== b.SubmittedDate())
                            return sortDescending ? Formatting.sortDesc(a.SubmittedDate(), b.SubmittedDate()) : Formatting.sortAsc(a.SubmittedDate(), b.SubmittedDate());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hRegHrs":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.RegHoursWorked() !== b.RegHoursWorked())
                            return sortDescending ? Formatting.sortDesc(a.RegHoursWorked(), b.RegHoursWorked()) : Formatting.sortAsc(a.RegHoursWorked(), b.RegHoursWorked());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hOvertimeHrs":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.OvertimeHoursWorked() !== b.OvertimeHoursWorked())
                            return sortDescending ? Formatting.sortDesc(a.OvertimeHoursWorked(), b.OvertimeHoursWorked()) : Formatting.sortAsc(a.OvertimeHoursWorked(), b.OvertimeHoursWorked());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hSubject":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.Subject() !== b.Subject())
                            return sortDescending ? Formatting.sortDesc(a.Subject(), b.Subject()) : Formatting.sortAsc(a.Subject(), b.Subject());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hDescription":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.Description() !== b.Description())
                            return sortDescending ? Formatting.sortDesc(a.Description(), b.Description()) : Formatting.sortAsc(a.Description(), b.Description());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hStatus":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.Reviewed() !== b.Reviewed())
                            return sortDescending ? Formatting.sortDesc(a.Reviewed(), b.Reviewed()) : Formatting.sortAsc(a.Reviewed(), b.Reviewed());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hLastUpBy":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.LastUpdatedBy() !== b.LastUpdatedBy())
                            return sortDescending ? Formatting.sortDesc(a.LastUpdatedBy(), b.LastUpdatedBy()) : Formatting.sortAsc(a.LastUpdatedBy(), b.LastUpdatedBy());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                case "hLastUpDt":
                    self.workOrdersView.sort(function (a, b) {
                        if (a.LastUpdatedDate() !== b.LastUpdatedDate())
                            return sortDescending ? Formatting.sortDesc(a.LastUpdatedDate(), b.LastUpdatedDate()) : Formatting.sortAsc(a.LastUpdatedDate(), b.LastUpdatedDate());
                        return sortDescending ? Formatting.sortDesc(a.ID(), b.ID()) : Formatting.sortAsc(a.ID(), b.ID());
                    });
                    break;
                default:
                    break;
            }
        };
        self.alterWorkOrdersView = function (d) {
            self.workOrdersView.removeAll();
            if (d.length > 0) {
                $(d).each(function (i, e) {
                    self.workOrdersView.push(e);
                });
            }
            else if (d == true) {
                $(self.allWorkOrders()).each(function (i, e) {
                    self.workOrdersView.push(e);
                });
            }
        };
        self.workOrdersPage = ko.computed(function () {
            var first = self.pageNumber() * self.recordsPerPage;
            return self.workOrdersView.slice(first, first + self.recordsPerPage);
        });
        self.totalPossiblePages = ko.computed(function () {
            var div = Math.floor(self.workOrdersView().length / self.recordsPerPage);
            div += self.workOrdersView().length % self.recordsPerPage > 0 ? 1 : 0;
            return div - 1;
        });
        self.previousPage = function () {
            if (self.pageNumber() > 0)
                self.pageNumber(self.pageNumber() - 1);
        };
        self.nextPage = function () {
            if (self.pageNumber() < self.totalPossiblePages())
                self.pageNumber(self.pageNumber() + 1);
        };
        self.loadWorkOrders(data);
    };
    function ReviewedGridText(reviewed) {
        if (reviewed == true)
            return "Approved";
        else if (reviewed == false)
            return "Rejected";
        else if (reviewed == null)
            return "";
    }
    WorkOrderModeling.ReviewedGridText = ReviewedGridText;
})(WorkOrderModeling || (WorkOrderModeling = {}));
//# sourceMappingURL=WorkOrderModeling.js.map