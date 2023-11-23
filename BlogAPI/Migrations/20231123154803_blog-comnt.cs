using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlogAPI.Migrations
{
    /// <inheritdoc />
    public partial class blogcomnt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Blogs_BlogId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_BlogId",
                table: "Comments");

            migrationBuilder.AlterColumn<long>(
                name: "ParentCommentId",
                table: "Comments",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "BlogId",
                table: "Comments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "BlogModelId",
                table: "Comments",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Blogs",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 11, 23, 15, 48, 2, 927, DateTimeKind.Utc).AddTicks(1171), new DateTime(2023, 11, 23, 15, 48, 2, 927, DateTimeKind.Utc).AddTicks(1174) });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_BlogModelId",
                table: "Comments",
                column: "BlogModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Blogs_BlogModelId",
                table: "Comments",
                column: "BlogModelId",
                principalTable: "Blogs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Blogs_BlogModelId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_BlogModelId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "BlogModelId",
                table: "Comments");

            migrationBuilder.AlterColumn<long>(
                name: "ParentCommentId",
                table: "Comments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "BlogId",
                table: "Comments",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.UpdateData(
                table: "Blogs",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2023, 11, 23, 14, 31, 32, 367, DateTimeKind.Utc).AddTicks(9875), new DateTime(2023, 11, 23, 14, 31, 32, 367, DateTimeKind.Utc).AddTicks(9878) });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_BlogId",
                table: "Comments",
                column: "BlogId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Blogs_BlogId",
                table: "Comments",
                column: "BlogId",
                principalTable: "Blogs",
                principalColumn: "Id");
        }
    }
}
