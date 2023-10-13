package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"net/http"
	"time"
)

const url = "root:zem509525130@tcp(localhost:3306)/db?parseTime=true"
const datasourceName = "mysql"

func main() {
	router := gin.Default()
	router.POST("/login", func(ctx *gin.Context) {
		var in Information
		ctx.BindJSON(&in)
		if in.Username == "admin" && in.Password == "admin" {
			ctx.Header("Access-Control-Allow-Credentials", "true")
			ctx.SetCookie("token", "login", 60*60, "/", "", false, false)
			ctx.JSON(http.StatusOK, "登录成功")
		} else {
			ctx.JSON(http.StatusForbidden, "登录失败")
		}
	})
	router.Use(func(ctx *gin.Context) {
		if cookie, _ := ctx.Cookie("token"); cookie == "login" {
			ctx.Next()
		} else {
			ctx.AbortWithStatusJSON(http.StatusForbidden, "登录失败")
		}
	})
	router.GET("/food/:fid", func(ctx *gin.Context) {
		fid := ctx.Param("fid")
		var food Food
		db.Get(&food, "select * from food where fid = ? limit 1", fid)
		ctx.JSON(http.StatusOK, food)
	})
	router.POST("/food/page", func(ctx *gin.Context) {
		var page Page
		ctx.BindJSON(&page)
		var foods []Food
		err := db.Select(&foods, "select fid, tname,ftype.tid, fname, fpic, fprice, forder, fdesc, fregtime from food left join ftype on food.tid=ftype.tid order by fid limit ?,? ", (page.Page-1)*page.PageSize, page.PageSize)
		if err != nil {
			fmt.Println(err)
			return
		}
		ctx.JSON(http.StatusOK, foods)
	})
	router.PUT("/food", func(ctx *gin.Context) {
		var food Food
		err := ctx.BindJSON(&food)
		if err != nil {
			fmt.Println(err)
			return
		}
		exec := db.MustExec("replace into food values(?,?,?,?,?,?,?,?)", food.Fid, food.Tid, food.Fname, food.Fpic, food.Fprice, food.Forder, food.Fdesc, food.Fregtime)
		affected, _ := exec.RowsAffected()
		if affected == 0 {
			ctx.JSON(http.StatusInternalServerError, "更新失败")
		}
		ctx.JSON(http.StatusOK, "更新成功")
	})
	router.DELETE("/food/:fid", func(ctx *gin.Context) {
		fid := ctx.Param("fid")
		db.MustExec("delete from food where fid = ?", fid)
		ctx.JSON(http.StatusOK, "删除成功")
	})

	router.GET("/type/:tid", func(ctx *gin.Context) {
		tid := ctx.Param("tid")
		var ftype Ftype
		db.Get(&ftype, "select * from ftype where tid = ? limit 1", tid)
		ctx.JSON(http.StatusOK, ftype)
	})
	router.POST("/type/page", func(ctx *gin.Context) {
		var page Page
		ctx.BindJSON(&page)
		var types []Ftype
		db.Select(&types, "select * from ftype order by tid limit ?,?", (page.Page-1)*page.PageSize, page.PageSize)
		ctx.JSON(http.StatusOK, types)
	})
	router.PUT("/type", func(ctx *gin.Context) {
		var ftype Ftype
		ctx.BindJSON(&ftype)
		fmt.Println("type", ftype)
		exec := db.MustExec("replace into ftype values(?,?)", ftype.Tid, ftype.Tname)
		id, _ := exec.RowsAffected()
		if id == 0 {
			ctx.JSON(http.StatusInternalServerError, "更新失败")
		}
		ctx.JSON(http.StatusOK, "更新成功")
	})
	router.DELETE("/type/:tid", func(ctx *gin.Context) {
		tid := ctx.Param("tid")
		db.MustExec("delete from ftype where tid = ?", tid)
		ctx.JSON(http.StatusOK, "删除成功")
	})
	router.GET("/typeId/:tname", func(ctx *gin.Context) {
		tname := ctx.Param("tname")
		var tid int
		fmt.Println(tid)
		db.Get(&tid, "select tid from ftype where tname = ? limit 1", tname)
		ctx.JSON(http.StatusOK, tid)
	})

	err := router.Run(":8080")
	if err != nil {
		panic("服务器启动失败")
	}
}

type Information struct {
	Username string `json:"username,omitempty"`
	Password string `json:"password,omitempty"`
}
type Page struct {
	Page     int `json:"page,omitempty"`
	PageSize int `json:"pageSize,omitempty"`
}
type Food struct {
	Fid      int       `json:"fid,omitempty" db:"fid"`
	Tid      int       `json:"tid,omitempty" db:"tid"`
	Tname    string    `json:"tname" db:"tname"`
	Fname    string    `json:"fname,omitempty" db:"fname"`
	Fpic     string    `json:"fpic,omitempty" db:"fpic"`
	Fprice   int       `json:"fprice,omitempty" db:"fprice"`
	Forder   int       `json:"forder,omitempty" db:"forder"`
	Fdesc    string    `json:"fdesc,omitempty" db:"fdesc"`
	Fregtime time.Time `json:"fregtime" db:"fregtime"`
}
type Ftype struct {
	Tid   int    `json:"tid,omitempty"`
	Tname string `json:"tname,omitempty"`
}

var db *sqlx.DB

func init() {
	var err error
	db, err = sqlx.Connect(datasourceName, url)
	if err != nil {
		fmt.Println("database connected error:\n" + err.Error())
		return
	}
	db.SetMaxOpenConns(20)
	db.SetMaxIdleConns(10)
}
