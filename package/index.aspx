<%@ Page Language="C#" MasterPageFile="~/CRS.Master" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="CRS.ManualTests.IndexPage" %>
<%@ MasterType VirtualPath="~/CRS.Master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <title><%= ConfigurationManager.AppSettings["ApplicationName"] %></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <base href="<%= ConfigurationManager.AppSettings["AppBaseUrl"] %>" />
    <link rel="stylesheet" href="assets/bundle-caf159425b.css">
    <script src="assets/bundle-feb30f115a.js"></script>
    
    <script type="text/javascript">
    System.import('app/main.js').then(function(app) {
        var appConfig = {
            CustomerId: <%= Master.CustomerID %>,
            SiteId: <%= Master.SiteID %>,
            StationId: <%= Master.StationID %>,
            StationName: '<%= Master.StationName %>',
            StationTypeID: <%= Master.StationTypeID %>,
            StationType: '<%= Master.StationType %>',
            EventTypeId: <%= Master.EventTypeID %>,
            StatusCode: <%= Master.StatusCode %>,
            OperatorId: '<%= Master.OperatorID %>',
            OperatorName: '<%= Master.Operator %>',
            AllowDiagnostics: <%= ConfigurationManager.AppSettings["AllowDiagnostics"] %>,
            EnableActivity: <%= ConfigurationManager.AppSettings["EnableActivity"] %>,
            ApiUrls: {
                BaseUrl: '<%= ConfigurationManager.AppSettings["ApiBaseUrl"] %>'
            },
            ProductionMode: true
        };

        app.Run(appConfig);
    },
    console.error.bind(console));
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PageHeading" runat="server"><%= ConfigurationManager.AppSettings["ApplicationName"] %></asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row" style="height: 600px;">
        <div class="container">
            <manual-tests>
                <i class="center-fix main-spinner fa fa-spin fa-spinner"></i>
            </manual-tests>
        </div>
    </div>
</asp:Content>