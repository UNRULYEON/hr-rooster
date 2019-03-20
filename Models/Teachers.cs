using System.ComponentModel.DataAnnotations;

namespace hr_rooster.Models
{
  public class Teachers{
    [Key]
    public string Teacher { get; set; }
    public Institutes Institute { get; set; }
  }
}