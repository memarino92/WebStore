using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebStoreAPI.Migrations
{
    public partial class AddCategoryAndMarkupToBookSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "Summary",
                table: "Book");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Book",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Cost",
                table: "Book",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Markup",
                table: "Book",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "Markup",
                table: "Book");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Book",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Summary",
                table: "Book",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
