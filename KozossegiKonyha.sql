USE [master]
GO
/****** Object:  Database [KozossegiKonyha]    Script Date: 2024. 04. 30. 10:54:56 ******/
CREATE DATABASE [KozossegiKonyha]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'KozossegiKonyha', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\KozossegiKonyha.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'KozossegiKonyha_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\KozossegiKonyha_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [KozossegiKonyha] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [KozossegiKonyha].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [KozossegiKonyha] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET ARITHABORT OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [KozossegiKonyha] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [KozossegiKonyha] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET  DISABLE_BROKER 
GO
ALTER DATABASE [KozossegiKonyha] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [KozossegiKonyha] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET RECOVERY FULL 
GO
ALTER DATABASE [KozossegiKonyha] SET  MULTI_USER 
GO
ALTER DATABASE [KozossegiKonyha] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [KozossegiKonyha] SET DB_CHAINING OFF 
GO
ALTER DATABASE [KozossegiKonyha] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [KozossegiKonyha] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [KozossegiKonyha] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [KozossegiKonyha] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'KozossegiKonyha', N'ON'
GO
ALTER DATABASE [KozossegiKonyha] SET QUERY_STORE = ON
GO
ALTER DATABASE [KozossegiKonyha] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [KozossegiKonyha]
GO
/****** Object:  Table [dbo].[Admins]    Script Date: 2024. 04. 30. 10:54:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admins](
	[admin_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[admin_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 2024. 04. 30. 10:54:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ingredients]    Script Date: 2024. 04. 30. 10:54:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ingredients](
	[ingredient_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[quantity] [int] NOT NULL,
	[unit] [nvarchar](50) NOT NULL,
	[recipe_id] [int] NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ingredient_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ratings]    Script Date: 2024. 04. 30. 10:54:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ratings](
	[rating_id] [int] IDENTITY(1,1) NOT NULL,
	[rating] [int] NOT NULL,
	[description] [nvarchar](max) NULL,
	[recipe_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[rating_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Recipes]    Script Date: 2024. 04. 30. 10:54:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Recipes](
	[recipe_id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](100) NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[preparation_time] [int] NULL,
	[difficulty_level] [varchar](255) NULL,
	[user_id] [int] NOT NULL,
	[category_id] [int] NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[recipe_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[title] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SellabeFoods]    Script Date: 2024. 04. 30. 10:54:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SellabeFoods](
	[food_id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](100) NOT NULL,
	[description] [nvarchar](max) NOT NULL,
	[price] [decimal](10, 2) NULL,
	[user_id] [int] NOT NULL,
	[category_id] [int] NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[food_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SellableFoodRatings]    Script Date: 2024. 04. 30. 10:54:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SellableFoodRatings](
	[rating_id] [int] IDENTITY(1,1) NOT NULL,
	[rating] [int] NOT NULL,
	[description] [nvarchar](max) NULL,
	[user_id] [int] NOT NULL,
	[food_id] [int] NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[rating_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2024. 04. 30. 10:54:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[password] [nvarchar](100) NOT NULL,
	[profile_picture] [nvarchar](255) NULL,
	[is_admin] [bit] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [sellabe_foods_title_user_id]    Script Date: 2024. 04. 30. 10:54:56 ******/
CREATE UNIQUE NONCLUSTERED INDEX [sellabe_foods_title_user_id] ON [dbo].[SellabeFoods]
(
	[title] ASC,
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [is_admin]
GO
ALTER TABLE [dbo].[Admins]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Ingredients]  WITH CHECK ADD FOREIGN KEY([recipe_id])
REFERENCES [dbo].[Recipes] ([recipe_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Ratings]  WITH CHECK ADD FOREIGN KEY([recipe_id])
REFERENCES [dbo].[Recipes] ([recipe_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Ratings]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Recipes]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Categories] ([category_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Recipes]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SellabeFoods]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Categories] ([category_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SellabeFoods]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SellableFoodRatings]  WITH CHECK ADD FOREIGN KEY([food_id])
REFERENCES [dbo].[SellabeFoods] ([food_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SellableFoodRatings]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Recipes]  WITH CHECK ADD CHECK  (([difficulty_level]=N'HARD' OR [difficulty_level]=N'MEDIUM' OR [difficulty_level]=N'EASY'))
GO
USE [master]
GO
ALTER DATABASE [KozossegiKonyha] SET  READ_WRITE 
GO
