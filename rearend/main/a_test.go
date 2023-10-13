package main

import (
	"fmt"
	"net/http"
	"strings"
	"testing"
)

func TestA(t *testing.T) {
	c := make(chan int, 0)
	for i := 0; i < 100; i++ {
		go func() {
			cu := 0
			for i := 0; i < 1000; i++ {
				var client = http.Client{}
				reader := strings.NewReader("{\"username\":\"admin\",\"password\":\"1\"}")
				resp, err := client.Post("http://172.22.146.223:8080/login?username=admin&password=1", "application/json", reader)
				var by = make([]byte, 12)
				resp.Body.Read(by)
				fmt.Println(string(by))
				if err != nil {
					fmt.Println(err)
				}
				if resp.Status == "200 OK" {
					cu++
				}
				fmt.Println(resp.Status)
			}
		}()
	}
	<-c

}
