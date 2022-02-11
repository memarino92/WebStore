using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebStoreAPI.Migrations
{
    public partial class UpdateBookWithTitleAndPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Book",
                newName: "Title");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Book",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Book");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Book",
                newName: "Name");
        }
    }
}
